class Section {
  constructor({ renderer }, containerSelector) {
    // this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.append(element);
  }

  addItemPrep(element) {
    this._container.prepend(element);
  }
}

export { Section };
