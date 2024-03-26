export class ResponseError extends Error {
    code;
    constructor(message, code) {
        super(message);
        this.code = code;
        this.code = code || 401;
    }
}
//# sourceMappingURL=customClasses.js.map