export default async function create (repository, payload) {
  return repository.repo.insert(payload);
}
