import repository from '../repositories/productsRepository';
import reportService from '../services/v1/product';

export async function list (req, res) {
  const data = await reportService({
    repo: repository(),
  }).list();
  res.status(200).json(data);
}

export async function detail (req, res) {
  const data = await reportService({
    repo: repository(),
  }).detail(req.params.id);

  if (!detail) res.status(404).end();

  res.status(200).json(data);
}

export async function create (req, res) {
  const newEntity = await reportService({
    repo: repository(),
  }).create(req.body);

  if (!newEntity) res.status(400).end();

  res.status(201).json(newEntity[0]);
}

export async function update (req, res) {
  const result = await reportService({
    repo: repository(),
  }).update(req.params.id, req.body);

  if (!result) res.status(400).end();

  res.status(200).json(result[0]);
}

export async function del (req, res) {
  const product = await repository().getById(req.params.id);

  if (!product) return res.status(404).end();

  await reportService({
    repo: repository(),
  }).del(req.params.id);

  return res.status(200).json(product);
}
