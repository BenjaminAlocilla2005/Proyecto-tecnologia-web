class AppError extends Error {
  constructor(message, status = 400, detalles) {
    super(message);
    this.name = 'AppError';
    this.status = status;
    this.detalles = detalles;
  }
}

module.exports = AppError;