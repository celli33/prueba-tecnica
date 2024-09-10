import router from '@adonisjs/core/services/router';

const PaginateTaxProfilesController = () => import('#controllers/tax_profiles/paginate_tax_profiles_controller');
const StoreTaxProfileController = () => import('#controllers/tax_profiles/store_tax_profile_controller');

const taxProfiles = (): void => {
  router.post('perfiles', [StoreTaxProfileController]).as('perfiles.store');
  router.get('perfiles', [PaginateTaxProfilesController]).as('perfiles.index');
};

export default taxProfiles;
