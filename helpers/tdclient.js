import TDLib from 'tdweb/dist/tdweb';

function getOSName() {
  let OSName = 'Unknown';
  if (window.navigator.userAgent.indexOf('Windows NT 10.0') !== -1)
    OSName = 'Windows 10';
  if (window.navigator.userAgent.indexOf('Windows NT 6.2') !== -1)
    OSName = 'Windows 8';
  if (window.navigator.userAgent.indexOf('Windows NT 6.1') !== -1)
    OSName = 'Windows 7';
  if (window.navigator.userAgent.indexOf('Windows NT 6.0') !== -1)
    OSName = 'Windows Vista';
  if (window.navigator.userAgent.indexOf('Windows NT 5.1') !== -1)
    OSName = 'Windows XP';
  if (window.navigator.userAgent.indexOf('Windows NT 5.0') !== -1)
    OSName = 'Windows 2000';
  if (window.navigator.userAgent.indexOf('Mac') !== -1) OSName = 'Mac/iOS';
  if (window.navigator.userAgent.indexOf('X11') !== -1) OSName = 'UNIX';
  if (window.navigator.userAgent.indexOf('Linux') !== -1) OSName = 'Linux';

  return OSName;
}

function getBrowser() {
  let browser_name = '';
  let isIE = /*@cc_on!@*/ false || !!document.documentMode;
  let isEdge = !isIE && !!window.StyleMedia;
  if (navigator.userAgent.indexOf('Chrome') !== -1 && !isEdge) {
    browser_name = 'Chrome';
  } else if (navigator.userAgent.indexOf('Safari') !== -1 && !isEdge) {
    browser_name = 'Safari';
  } else if (navigator.userAgent.indexOf('Firefox') !== -1) {
    browser_name = 'Firefox';
  } else if (
    navigator.userAgent.indexOf('MSIE') !== -1 ||
    !!document.documentMode === true
  ) {
    //IF IE > 10
    browser_name = 'IE';
  } else if (isEdge) {
    browser_name = 'Edge';
  } else {
    browser_name = 'Unknown';
  }

  return browser_name;
}

const { API_HASH, API_ID, LOG_LEVEL } = process.env;

class TDClient {
  constructor() {
    this.showLog = LOG_LEVEL > 0;
    this.client = new TDLib({
      logVerbosityLevel: 1,
      jsLogVerbosityLevel: 3,
      mode: 'wasm', // 'wasm-streaming'/'wasm'/'asmjs'
      prefix: 'tdlib',
      readOnly: false,
      isBackground: false,
      useDatabase: false,
      wasmUrl:
        'b4b0d61282108a31908dd6b2dbd7067b.wasm?_sw-precache=b4b0d61282108a31908dd6b2dbd7067b',
    });

    this.init();
  }

  init() {
    this.client.onUpdate = this.__onUpdate;

    this.client.send({
      '@type': 'setTdlibParameters',
      parameters: {
        '@type': 'tdParameters',
        api_hash: API_HASH,
        api_id: API_ID,
        application_version: '0.0.1',
        database_directory: '/db',
        device_model: getBrowser(),
        files_directory: '/',
        system_language_code: 'en-US',
        system_version: getOSName(),
        use_file_database: false,
        use_message_database: true,
        use_secret_chats: false,
        use_test_dc: false,
      },
    });
  }

  __onUpdate = (update) => {
    if (this.showLog) {
      if (update['@type'] === 'updateFile') {
        console.log('receive updateFile file_id=' + update.file.id, update);
      } else {
        console.log('receive update', update);
      }
    }

    if (
      update['@type'] === 'updateAuthorizationState' &&
      update.authorization_state['@type'] ===
        'authorizationStateWaitEncryptionKey'
    ) {
      this.client.send({ '@type': 'checkDatabaseEncryptionKey' });
    }
    // this.emit('update', update);
  };

  send = (request) => {
    if (this.showLog) {
      console.log('send', request);
      return this.client
        .send(request)
        .then((result) => {
          console.log('receive result', result);
          return result;
        })
        .catch((error) => {
          console.error('catch error', error);

          throw error;
        });
    } else {
      return this.client.send(request);
    }
  };

  logOut() {
    this.send({ '@type': 'logOut' });
  }

  setPhone(phone) {
    return this.client.send({
      '@type': 'setAuthenticationPhoneNumber',
      phone_number: phone,
    });
  }

  verifyCode(code) {
    return this.client.send({
      '@type': 'checkAuthenticationCode',
      code,
      first_name: 'A',
      last_name: 'B',
    });
  }

  getChats() {
    return this.client
      .send({
        '@type': 'getChats',
        limit: 2147483647,
        offset_chat_id: 0,
        offset_order: '9223372036854775807',
      })
      .then(async (result) => {
        const chats = {};
        await Promise.all(
          result.chat_ids.map((id) =>
            this.client
              .send({ '@type': 'getChat', chat_id: id })
              .then((chat) => {
                chats[chat.id] = chat;

                return chat;
              })
          )
        );

        return chats;
      });
  }

  getChatHistory(id) {
    return this.client.send({
      '@type': 'getChatHistory',
      chat_id: id,
      offset: 0,
      from_message_id: 0,
      limit: 99,
    });
  }
}

let singleton = null;

export default singleton || (singleton = new TDClient());
