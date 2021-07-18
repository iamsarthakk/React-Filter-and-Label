/**
 *
 * Asynchronously loads the component for Utils
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
