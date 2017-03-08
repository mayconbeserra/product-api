export default async function del (repository, id) {
  return repository.repo.delete(id);
}
