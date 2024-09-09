import router from '@adonisjs/core/services/router';
// import { middleware } from '#start/kernel';
import StoreTaxProfileController from '#controllers/tax_profiles/store_tax_profile_controller';
import PaginateTaxProfilesController from '#controllers/tax_profiles/paginate_tax_profiles_controller';


const taxProfiles = (): void => {
  router.post('perfiles', [StoreTaxProfileController]).as('perfiles.store');
  router.get('perfiles', [PaginateTaxProfilesController]).as('perfiles.index');
};

export default taxProfiles;
