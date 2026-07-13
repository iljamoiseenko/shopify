class ProductCardSwatches extends HTMLElement {
  connectedCallback() {
    this.mainImage = this.querySelector('[data-product-card-main-image]');
    this.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick(event) {
    const swatch = event.target.closest('[data-swatch]');
    if (!swatch || !this.contains(swatch)) return;

    this.querySelectorAll('[data-swatch]').forEach((button) => {
      button.setAttribute('aria-pressed', 'false');
    });
    swatch.setAttribute('aria-pressed', 'true');

    if (!this.mainImage) return;
    const { image, srcset, alt } = swatch.dataset;
    if (image) this.mainImage.src = image;
    if (srcset) this.mainImage.srcset = srcset;
    if (alt) this.mainImage.alt = alt;
  }
}

customElements.define('product-card-swatches', ProductCardSwatches);
