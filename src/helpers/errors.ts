export class DataBaseProject extends Error {
    status: number;
    constructor(message: string) {
        super(message);
        this.status = 400;
    }
}

export class NotFound extends DataBaseProject {
    constructor(message: string) {
        super(message);
        this.status = 404;
    }
}

export class BadRequest extends DataBaseProject {
    constructor(message: string) {
        super(message);
        this.status = 400;
    }
}

export class WrongParams extends DataBaseProject {
    constructor(message: string) {
        super(message);
        this.status = 403;
    }
}

export class NotAuthorized extends DataBaseProject {
    constructor(message: string) {
        super(message);
        this.status = 401;
    }
}

export class RegisterConflict extends DataBaseProject {
    constructor(message: string) {
        super(message);
        this.status = 409;
    }
}