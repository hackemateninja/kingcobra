import { NextApiRequest, NextApiResponse } from 'next';
import makes from '@/data/makes_body_types.json';

const bodyTypes = {
  suv: 'Sport Utility',
  truck: 'Regular Side',
  convertible: 'Convertible',
  coupe: 'Coupe',
  hybrid: 'Hybrid',
  'minivan/van': 'Passenger Van',
  minivan: 'Passenger Van',
  van: 'Passenger Van',
  sedan: 'Sedan',
  wagon: 'Wagon',
};

const ev = ['ev', 'evs'];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { make, bodyType } = req.query;
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  const response = await fetch(`https://dev2-uc-kingcobra-apim.azure-api.net/vsp/v2/prod/models/${make}`);
  const data = make ? await response.json() : [];
  const models = data.filter((i) => i.bodyTypes === bodyTypes[`${bodyType}`]);

  const filteredMakes = ev.includes(`${bodyType}`) ? [] : makes.filter((i) => i.body_type.includes(`${bodyType}`));

  return res.json({
    makes: filteredMakes,
    models: models,
  });
}
