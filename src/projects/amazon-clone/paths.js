/** Base path for the E-Commerce Website demo (nested under the portfolio app). */
export const AMAZON_CLONE_BASE = '/amazon-clone';

export const amazonPaths = {
  home: AMAZON_CLONE_BASE,
  checkout: `${AMAZON_CLONE_BASE}/checkout`,
  you: `${AMAZON_CLONE_BASE}/you`,
  product: (id) => `${AMAZON_CLONE_BASE}/product/${id}`,
};
