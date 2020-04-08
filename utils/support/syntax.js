export function nullCoalescing() {
  return null ?? true;
}

export function optionalChaining() {
  const chain = { a: { b: { c: true } } };
  return chain.a?.b?.c;
}

export function privateClassVariables() {
  class Person {
    #born = 2020;
    age() {
      return 2020 - this.#born === 0;
    }
  }
  const man = new Person();

  return man.age();
}
