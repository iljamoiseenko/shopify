class ProductCardSwatches extends HTMLElement {
  connectedCallback() {
    this.mainImage = this.querySelector('[data-product-card-main-image]');
    this.secondaryImage = this.querySelector('[data-product-card-secondary-image]');
    this.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick(event) {
    const swatch = event.target.closest('[data-swatch]');
    if (!swatch || !this.contains(swatch)) return;

    this.querySelectorAll('[data-swatch]').forEach((button) => {
      button.setAttribute('aria-pressed', 'false');
    });
    swatch.setAttribute('aria-pressed', 'true');

    if (this.mainImage) {
      const { image, srcset, alt } = swatch.dataset;
      if (image) this.mainImage.src = image;
      if (srcset) this.mainImage.srcset = srcset;
      if (alt) this.mainImage.alt = alt;
    }

    if (this.secondaryImage) {
      const { secondaryImage, secondarySrcset } = swatch.dataset;
      // A variant without its own hover shot hides the overlay rather than
      // showing a stale image from whichever color was selected before it.
      this.secondaryImage.style.display = secondaryImage ? '' : 'none';
      if (secondaryImage) this.secondaryImage.src = secondaryImage;
      if (secondarySrcset) this.secondaryImage.srcset = secondarySrcset;
    }
  }
}

customElements.define('product-card-swatches', ProductCardSwatches);
