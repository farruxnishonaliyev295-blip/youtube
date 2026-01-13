export class InternalServerError extends Error{
    constructor(status, messege){
        super()
        this.status=status
        this.messege=messege
        this.name="InternalServerError"
    }
}

export class BadRequesError extends Error{
    constructor(status, messege){
        super()
        this.status=status
        this.messege=messege
        this.name="BadRequesError"
    }
}

export class NotFountError extends Error{
    constructor(status, messege){
        super()
        this.status=status
        this.messege=messege
        this.name="NotFountError"
    }
}

export class ConflictError extends Error{
    constructor(status, messege){
        super()
        this.status=status
        this.messege=messege
        this.name="ConflictError"
    }
}
export class ForBiddenError extends Error{
    constructor(status, messege){
        super()
        this.status=status
        this.messege=messege
        this.name="ForBiddenError"
    }
}