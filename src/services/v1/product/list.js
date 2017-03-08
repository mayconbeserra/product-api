export default async function list (repository) {
  return repository.repo.getAll();
}
