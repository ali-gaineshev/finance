class Object{
    constructor(id, name){
        this.id = id;
        this.name = name;
    } 
}

class Category extends Object{
    constructor(id, name){
        super(id, name);
    }
}

class Type extends Object{
    constructor(id, name){
        super(id, name);
    }
}

class Frequency extends Object{
    constructor(id, name){
        super(id, name);
    }
}

class Entry{
    constructor(category, type, frequency, date){
        this.category = category;
        this.type = type;
        this.frequency = frequency;
        this.date = date;
    }
}