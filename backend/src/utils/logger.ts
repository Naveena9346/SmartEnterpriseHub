export class Logger {
  private static formatMessage(level: string, message: string, meta?: any): string {
    const timestamp = new Date().toISOString();
    const metaString = meta ? ` | Meta: ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}]: ${message}${metaString}`;
  }

  public static info(message: string, meta?: any): void {
    console.log(this.formatMessage('INFO', message, meta));
  }

  public static warn(message: string, meta?: any): void {
    console.warn(this.formatMessage('WARN', message, meta));
  }

  public static error(message: string, meta?: any): void {
    console.error(this.formatMessage('ERROR', message, meta));
  }

  public static debug(message: string, meta?: any): void {
    if (process.env.NODE_ENV !== 'production') {
      console.log(this.formatMessage('DEBUG', message, meta));
    }
  }
}
