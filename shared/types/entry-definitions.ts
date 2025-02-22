enum Occurrence {
  ONE_TIME = "one-time",
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  CUSTOM = "custom",
}

enum Category {
  FOOD_AND_DRINKS = "Food & Drinks",
  TRANSPORTATION = "Transportation",
  HOUSING = "Housing",
  HEALTH = "Health & Wellness",
  SHOPPING = "Shopping",
  ENTERTAINMENT = "Entertainment",
  EDUCATION = "Education",
  TRAVEL = "Travel",
  GIFTS_AND_DONATIONS = "Gifts & Donation",
  MISCELLANEOUS = "Miscellaneous",
  PETS = "Pets",
}

enum Type {
  ESSENTIAL = "Essential",
  NON_ESSENTIAL = "Non-Essential",
  MIXED = "Mixed",
}

export { Occurrence, Category, Type };
