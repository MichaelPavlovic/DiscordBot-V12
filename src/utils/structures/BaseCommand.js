module.exports = class BaseCommand {
  constructor(name, category, aliases, usage) {
    this.name = name;
    this.category = category;
    this.aliases = aliases;
    this.usage = usage;
  }
}