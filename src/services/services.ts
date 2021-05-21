import { IModel } from '@/def/IModel';
import { config } from '@/util/config';
import { IMake } from '../definitions/IMake';
import getMonth from '@/util/get-month';

export const getMakes = async (): Promise<IMake[]> => {
  const response = await fetch(`${config.apiBaseUrl}/makes`);

  return response.json();
};

export const getModelsByMake = async (make: string | string[]): Promise<IModel[]> => {
  const response = await fetch(`${config.apiBaseUrl}/models/${make}`);

  return response.json();
};

export const getCampaignData = async ({ campaign, funnelStep }, make = 'Acura', model = 'ILX'): Promise<any> => {
  const currentMonth = getMonth();
  if (!campaign && !funnelStep) {
    return;
  }
  const query = `{"query":"query MyQuery {personalizations(where: {${campaign ? 'campaign: ' + campaign : ''} ${
    funnelStep ? 'funnelStep: ' + funnelStep : ''
  }}){h1Headline h2Headline heroImage buttonCta banner { banner }}}","variables":null,"operationName":"MyQuery"}`;
  return await fetch(config.graphCMSUrl, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2MjEzODY4NjMsImF1ZCI6WyJodHRwczovL2FwaS11cy1lYXN0LTEuZ3JhcGhjbXMuY29tL3YyL2Nrb2x2c2owdjAxdTEwMXoxaDRuODZ4ZzYvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiMTNjNzNjZGYtZGYxZS00NmI5LThkOGQtMjE5MTNhNmY4ODQ2IiwianRpIjoiY2tvdXJ2ajFwcGZ1ejAxeGxmYThuaGlxNiJ9.TQqA5vQyHc1Ym4XXJHppL6nEi2vXliBEfMNAFEUnEAwVAeCFCJSXbWAF8m85dT2yXDJaxyBH9n_GkZeXDw8ZBScw3q88kDjyuytqwordaI2924UJP38ICymjYjV7EnN33AXnymOmLLh_0gJFvBdGTmApX11bYG0-DALTwZskwKX_WK2QCRj0Q_FVdQFtfZBjnPWns3nwhQlFe4L7EG1D_phtki8ytuT70g_gBq5Qbm5nrUQQS0vgejBGa6x6B-N0s9iuW70SO0iGZiRspUy9PdSXFl_xaQ1KkAhs6tyHotbIWAkRquTJ-CO0-To4ujEuD356Co0Faf6BKr72_GPp18UvawrYdACs46ID3oKeSU7H5oqJmZqf7AEA3KwiY9Xi3xy7LtQkvZhBZ8pIZlHbwlnVp8ktHn5MBd6s4dY6sUKTI5fg7PTPmJS4a_bK_zpkk3yHQySWXJd1zEsO2yDVgLEPJ770SfoWJiZn7KVXff5ReZnqdyBan9ZCEgH-X3ehUez1ZuskpYgIeZxNU3ZqMKt8vDNvS-KBCxbJUoszh6OCDQA7FTZ1mabDPI2cefARDUcXvJ-eIA3kVavUWyhisv6HRXrYAZ8kpnlWlT2ZGj1y2fOYQ_l_k8zAaNtqflFyzvSwL_OOCQDTjYvNxL5kkzf_PkTz-j2-a-5gj4a9orU',
      'gcms-stage': 'PUBLISHED',
    },
    body: query,
  })
    .then((response: Response): any => {
      return response.json();
    })
    .then((response) => {
      let result = response.data.personalizations;
      result = JSON.stringify(result)
        .replaceAll('[make]', make)
        .replaceAll('[MAKE]', make)
        .replaceAll('[model]', model)
        .replaceAll('[MODEL]', model)
        .replaceAll('[MONTH]', currentMonth);
      return JSON.parse(result);
    });
};
