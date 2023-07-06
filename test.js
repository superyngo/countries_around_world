function outter(name) {
  this.name = name;
  this.greeting = () => {
    return `hello ${this.name}`;
  };

  this.changename = (newname) => {
    this.name = newname;
  };

  // return [greeting, changename];
}

// const [greeting, changename] = outter("XIXI");

let outter2 = new outter("KK");

console.log(outter2.name);

outter2.changename("JJ");
console.log(outter2.name);
