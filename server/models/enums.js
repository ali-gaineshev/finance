class HTTP_CODE {
    static OK = 200;
    static CREATED = 201;
    static BAD_REQUEST = 400;
    static UNAUTHORIZED = 401;
    static FORBIDDEN = 403;
    static NOT_FOUND = 404;
    static METHOD_NOT_ALLOWED = 405;
    static INTERNAL_SERVER_ERROR = 500;
}

class Category {
    static food_and_drinks = "Food & Drinks";
    static transportation  = "Transportation";
    static housing         = "Housing";
    static health          = "Health & Wellness";
    static shopping        = "Shopping";
    static entertainment   = "Entertainment";
    static education       = "Education";
    static travel          = "Travel";
    static giftsDonations  = "Gifts & Donations";
    static miscellaneous   = "Miscellaneous";
    static pets            = "Pets";
}

class Occurrence {
    static recurring = "Recurring";
    static one_time  = "One time";
}

class Type {
    static essential     = "Essential";
    static non_essential = "Non-Essential";
    static mixed         = "Mixed";
}

module.exports = {HTTP_CODE, Category, Occurrence, Type};