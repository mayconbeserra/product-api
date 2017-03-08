export default async function detail (repository, id) {
  return repository.repo.getById(id);
}
