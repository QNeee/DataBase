"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterConflict = exports.NotAuthorized = exports.WrongParams = exports.BadRequest = exports.NotFound = exports.DataBaseProject = void 0;
class DataBaseProject extends Error {
    constructor(message) {
        super(message);
        this.status = 400;
    }
}
exports.DataBaseProject = DataBaseProject;
class NotFound extends DataBaseProject {
    constructor(message) {
        super(message);
        this.status = 404;
    }
}
exports.NotFound = NotFound;
class BadRequest extends DataBaseProject {
    constructor(message) {
        super(message);
        this.status = 400;
    }
}
exports.BadRequest = BadRequest;
class WrongParams extends DataBaseProject {
    constructor(message) {
        super(message);
        this.status = 403;
    }
}
exports.WrongParams = WrongParams;
class NotAuthorized extends DataBaseProject {
    constructor(message) {
        super(message);
        this.status = 401;
    }
}
exports.NotAuthorized = NotAuthorized;
class RegisterConflict extends DataBaseProject {
    constructor(message) {
        super(message);
        this.status = 409;
    }
}
exports.RegisterConflict = RegisterConflict;
//# sourceMappingURL=errors.js.map