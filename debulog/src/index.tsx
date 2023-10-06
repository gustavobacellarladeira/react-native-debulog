export interface DebulogOptions {
  hideLogs?: boolean;
  showBadge?: boolean;
  hasArrow?: boolean;
  hasHighligh?: boolean;
  hasJsonStringify?: boolean;
  stringifySpaces?: number;
}

const defaultOptions: DebulogOptions = {
  hideLogs: false,
  showBadge: false,
  hasHighligh: true,
  hasArrow: true,
  hasJsonStringify: true,
  stringifySpaces: 2,
};

let currentOptions: DebulogOptions = {
  hideLogs: false,
  showBadge: false,
  hasHighligh: true,
  hasArrow: true,
  hasJsonStringify: true,
  stringifySpaces: 2,
};

export const setLogOptions = (newOptions: DebulogOptions) => {
  currentOptions = { ...defaultOptions, ...newOptions };
};

const handlerColorArrow = (
  type:
    | 'success'
    | 'error'
    | 'warning'
    | 'info'
    | 'debug'
    | 'white'
    | 'none' = 'none'
) => {
  switch (type) {
    case 'success':
      return '\x1b[38;5;82m➜\x1b[0m';
    case 'error':
      return '\x1b[38;5;196m➜\x1b[0m';
    case 'warning':
      return '\x1b[38;5;226m➜\x1b[0m';
    case 'info':
      return '\x1b[38;5;33m➜\x1b[0m';
    case 'debug':
      return '\x1b[38;5;201m➜\x1b[0m';
    case 'white':
      return '\x1b[38;5;15m➜\x1b[0m';
    default:
      return '\x1b[38;5;82m➜\x1b[0m';
  }
};

const handlerShowHighligh = (
  type:
    | 'success'
    | 'error'
    | 'warning'
    | 'info'
    | 'debug'
    | 'white'
    | 'none' = 'none'
) => {
  if (currentOptions.hasHighligh === true) {
    switch (type) {
      case 'success':
        return '\x1b[38;5;82m[ SUCCESS ] \x1b[0m';
      case 'error':
        return '\x1b[38;5;196m[ ERROR ] \x1b[0m';
      case 'warning':
        return '\x1b[38;5;226m[ WARNING ] \x1b[0m';
      case 'info':
        return '\x1b[38;5;33m[ INFO ] \x1b[0m';
      case 'debug':
        return '\x1b[38;5;201m[ DEBUG ] \x1b[0m';
      case 'white':
        return '\x1b[38;5;15m[ LOG ] \x1b[0m';
      default:
    }
  }
  return '';
};

const handlerShowArrow = (
  type:
    | 'success'
    | 'error'
    | 'warning'
    | 'info'
    | 'debug'
    | 'white'
    | 'none' = 'none'
) => {
  if (currentOptions.hasArrow === true) {
    const arrow = currentOptions.hasArrow ? handlerColorArrow(type) : '';

    switch (type) {
      case 'success':
        return arrow + ' ';
      case 'error':
        return arrow + ' ';
      case 'warning':
        return arrow + ' ';
      case 'info':
        return arrow + ' ';
      case 'debug':
        return arrow + ' ';
      case 'white':
        return arrow + ' ';
      default:
    }
  }
  return '';
};

const handlerShowBadge = (
  type: 'success' | 'error' | 'warning' | 'info' | 'debug' | 'white'
) => {
  if (currentOptions.showBadge === true) {
    switch (type) {
      case 'success':
        return '🟢';
      case 'error':
        return '🔴';
      case 'warning':
        return '🟡';
      case 'info':
        return '🔵';
      case 'debug':
        // uma bolinha magenta
        return '🟣';
      case 'white':
        return '⚪️';
      default:
        return '⚪️';
    }
  }
  return '';
};

const handlerJsonStringify = (message: string) => {
  try {
    if (currentOptions.hasJsonStringify === false) {
      return message;
    }

    if (typeof message === 'object') {
      return JSON.stringify(message, null, currentOptions.stringifySpaces);
    }
    return message;
  } catch (error) {
    return message;
  }
};

export const logSuccess = (message: string, somethingElse?: any) => {
  const logType = 'success';

  if (currentOptions.hideLogs === true) {
    return;
  }
  const arrow = handlerShowArrow(logType);
  const badge = handlerShowBadge(logType);
  const highligh = handlerShowHighligh(logType);

  let mesageWithParams = highligh;
  const regex = /\[.*?\]/g;
  const match = message.match(regex);

  if (match !== null && match.length > 0) {
    const matchString = match[0];

    if (matchString.indexOf(message) === 0) {
      const matchStringWithoutBrackets = matchString.replace(/\[|\]/g, '');
      const matchStringWithBrackets = `[${matchStringWithoutBrackets}]`;
      mesageWithParams = `\x1b[38;5;82m${matchStringWithBrackets}\x1b[0m`;
      message = message.replace(matchStringWithBrackets, '');
      message = message.trim();
    }

    if (matchString.indexOf(message) !== 1) {
      // acha [arrow] ou [ arrow ] e coloca o arrow, faç
      const regexArrow = /\[\s*arrow\s*\]/i;
      const matchArrow = message.match(regexArrow);
      if (matchArrow !== null && matchArrow.length > 0) {
        message = message.replace(matchArrow[0], handlerShowArrow(logType));
      }
    }
  }

  if (somethingElse) {
    return console.log(
      `${badge} ${mesageWithParams} ${arrow} \x1b[38;5;82m${handlerJsonStringify(
        message
      )} ${handlerJsonStringify(somethingElse)}\x1b[0m`
    );
  }
  return console.log(
    `${badge} ${mesageWithParams} ${arrow} \x1b[38;5;82m${handlerJsonStringify(
      message
    )}\x1b[0m`
  );
};

export const logError = (message: string, somethingElse?: any) => {
  const logType = 'error';
  if (currentOptions.hideLogs === true) {
    return;
  }
  const arrow = handlerShowArrow(logType);
  const badge = handlerShowBadge(logType);
  const highligh = handlerShowHighligh(logType);

  let mesageWithParams = highligh;
  const regex = /\[.*?\]/g;
  const match = message.match(regex);

  if (match !== null && match.length > 0) {
    const matchString = match[0];

    if (matchString.indexOf(message) === 0) {
      const matchStringWithoutBrackets = matchString.replace(/\[|\]/g, '');
      const matchStringWithBrackets = `[${matchStringWithoutBrackets}]`;
      mesageWithParams = `\x1b[38;5;82m${matchStringWithBrackets}\x1b[0m`;
      message = message.replace(matchStringWithBrackets, '');
      message = message.trim();
    }

    if (matchString.indexOf(message) !== 1) {
      // acha [arrow] ou [ arrow ] e coloca o arrow, faç
      const regexArrow = /\[\s*arrow\s*\]/i;
      const matchArrow = message.match(regexArrow);
      if (matchArrow !== null && matchArrow.length > 0) {
        message = message.replace(matchArrow[0], handlerShowArrow(logType));
      }
    }
  }

  if (somethingElse) {
    return console.log(
      `${badge} ${mesageWithParams} ${arrow} \x1b[38;5;196m${handlerJsonStringify(
        message
      )} ${handlerJsonStringify(somethingElse)}\x1b[0m`
    );
  }
  return console.log(
    `${badge} ${mesageWithParams} ${arrow} \x1b[38;5;196m${handlerJsonStringify(
      message
    )}\x1b[0m`
  );
};

export const logWarning = (message: string, somethingElse?: any) => {
  const logType = 'warning';

  if (currentOptions.hideLogs === true) {
    return;
  }
  const arrow = handlerShowArrow(logType);
  const badge = handlerShowBadge(logType);
  const highligh = handlerShowHighligh(logType);

  let mesageWithParams = highligh;
  const regex = /\[.*?\]/g;
  const match = message.match(regex);

  if (match !== null && match.length > 0) {
    const matchString = match[0];

    if (matchString.indexOf(message) === 0) {
      const matchStringWithoutBrackets = matchString.replace(/\[|\]/g, '');
      const matchStringWithBrackets = `[${matchStringWithoutBrackets}]`;
      mesageWithParams = `\x1b[38;5;82m${matchStringWithBrackets}\x1b[0m`;
      message = message.replace(matchStringWithBrackets, '');
      message = message.trim();
    }

    if (matchString.indexOf(message) !== 1) {
      // acha [arrow] ou [ arrow ] e coloca o arrow, faç
      const regexArrow = /\[\s*arrow\s*\]/i;
      const matchArrow = message.match(regexArrow);
      if (matchArrow !== null && matchArrow.length > 0) {
        message = message.replace(matchArrow[0], handlerShowArrow(logType));
      }
    }
  }

  if (somethingElse) {
    return console.log(
      `${badge} ${mesageWithParams} ${arrow} \x1b[38;5;226m${handlerJsonStringify(
        message
      )} ${handlerJsonStringify(somethingElse)}\x1b[0m`
    );
  }
  return console.log(
    `${badge} ${mesageWithParams} ${arrow} \x1b[38;5;226m${handlerJsonStringify(
      message
    )}\x1b[0m`
  );
};

export const logInfo = (message: string, somethingElse?: any) => {
  const logType = 'error';

  if (currentOptions.hideLogs === true) {
    return;
  }
  const arrow = handlerShowArrow(logType);
  const badge = handlerShowBadge(logType);
  const highligh = handlerShowHighligh(logType);

  let mesageWithParams = highligh;
  const regex = /\[.*?\]/g;
  const match = message.match(regex);

  if (match !== null && match.length > 0) {
    const matchString = match[0];

    if (matchString.indexOf(message) === 0) {
      const matchStringWithoutBrackets = matchString.replace(/\[|\]/g, '');
      const matchStringWithBrackets = `[${matchStringWithoutBrackets}]`;
      mesageWithParams = `\x1b[38;5;82m${matchStringWithBrackets}\x1b[0m`;
      message = message.replace(matchStringWithBrackets, '');
      message = message.trim();
    }

    if (matchString.indexOf(message) !== 1) {
      // acha [arrow] ou [ arrow ] e coloca o arrow, faç
      const regexArrow = /\[\s*arrow\s*\]/i;
      const matchArrow = message.match(regexArrow);
      if (matchArrow !== null && matchArrow.length > 0) {
        message = message.replace(matchArrow[0], handlerShowArrow(logType));
      }
    }
  }
  if (somethingElse) {
    return console.log(
      `${badge} ${mesageWithParams} ${arrow} \x1b[38;5;33m${handlerJsonStringify(
        message
      )} ${handlerJsonStringify(somethingElse)}\x1b[0m`
    );
  }
  return console.log(
    `${badge} ${mesageWithParams} ${arrow} \x1b[38;5;33m${handlerJsonStringify(
      message
    )}\x1b[0m`
  );
};

export const logDebug = (message: string, somethingElse?: any) => {
  const logType = 'error';

  if (currentOptions.hideLogs === true) {
    return;
  }
  const arrow = handlerShowArrow(logType);
  const badge = handlerShowBadge(logType);
  const highligh = handlerShowHighligh(logType);

  let mesageWithParams = highligh;
  const regex = /\[.*?\]/g;
  const match = message.match(regex);

  if (match !== null && match.length > 0) {
    const matchString = match[0];

    if (matchString.indexOf(message) === 0) {
      const matchStringWithoutBrackets = matchString.replace(/\[|\]/g, '');
      const matchStringWithBrackets = `[${matchStringWithoutBrackets}]`;
      mesageWithParams = `\x1b[38;5;82m${matchStringWithBrackets}\x1b[0m`;
      message = message.replace(matchStringWithBrackets, '');
      message = message.trim();
    }

    if (matchString.indexOf(message) !== 1) {
      // acha [arrow] ou [ arrow ] e coloca o arrow, faç
      const regexArrow = /\[\s*arrow\s*\]/i;
      const matchArrow = message.match(regexArrow);
      if (matchArrow !== null && matchArrow.length > 0) {
        message = message.replace(matchArrow[0], handlerShowArrow(logType));
      }
    }
  }
  if (somethingElse) {
    return console.log(
      `${badge} ${mesageWithParams} ${arrow} \x1b[38;5;201m${handlerJsonStringify(
        message
      )} ${handlerJsonStringify(somethingElse)}\x1b[0m`
    );
  }
  return console.log(
    `${badge} ${mesageWithParams} ${arrow} \x1b[38;5;201m${handlerJsonStringify(
      message
    )}\x1b[0m`
  );
};

export const log = (message: string, somethingElse?: any) => {
  const logType = 'error';

  if (currentOptions.hideLogs === true) {
    return;
  }
  const arrow = handlerShowArrow(logType);
  const badge = handlerShowBadge(logType);
  const highligh = handlerShowHighligh(logType);

  let mesageWithParams = highligh;
  const regex = /\[.*?\]/g;
  const match = message.match(regex);

  if (match !== null && match.length > 0) {
    const matchString = match[0];

    if (matchString.indexOf(message) === 0) {
      const matchStringWithoutBrackets = matchString.replace(/\[|\]/g, '');
      const matchStringWithBrackets = `[${matchStringWithoutBrackets}]`;
      mesageWithParams = `\x1b[38;5;82m${matchStringWithBrackets}\x1b[0m`;
      message = message.replace(matchStringWithBrackets, '');
      message = message.trim();
    }

    if (matchString.indexOf(message) !== 1) {
      // acha [arrow] ou [ arrow ] e coloca o arrow, faç
      const regexArrow = /\[\s*arrow\s*\]/i;
      const matchArrow = message.match(regexArrow);
      if (matchArrow !== null && matchArrow.length > 0) {
        message = message.replace(matchArrow[0], handlerShowArrow(logType));
      }
    }
  }

  if (somethingElse) {
    return console.log(
      `${badge} ${mesageWithParams} ${arrow} ${handlerJsonStringify(
        message
      )} ${handlerJsonStringify(somethingElse)}`
    );
  }
  return console.log(
    `${badge} ${mesageWithParams} ${arrow} ${handlerJsonStringify(message)}`
  );
};
