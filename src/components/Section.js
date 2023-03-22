class Section {
  constructor({ renderer }, containerSelector) {
    // this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(res) {
    res.forEach(this._renderer);
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

export { Section };
