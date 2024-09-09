import router from '@adonisjs/core/services/router';
// import { middleware } from '#start/kernel';
import StoreTaxProfileController from '#controllers/tax_profiles/store_tax_profile_controller';


const taxProfiles = (): void => {
  router.post('perfiles', [StoreTaxProfileController]).as('perfiles.store');
};

export default taxProfiles;
