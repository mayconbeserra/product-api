export default async function update (repository, id, data) {
  return repository.repo.update(id, data);
}
