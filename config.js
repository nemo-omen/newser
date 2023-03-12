// warning, only 100 api calls per day
// const newsOrgKey = 'cc5e78c843f04ef8acc0e6783959bce5';

const config = {
  apiUrl: "https://free-news.p.rapidapi.com/v1/search?q=",
  apiLang: "en",
  fetchOptions: {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "free-news.p.rapidapi.com",
      "X-RapidAPI-Key": "d87009ab1emsha1d54ca4dce7459p19e676jsn505219e3765f",
    },
  },
  apiPageSize: 24,
  defaultSearchTerm: "The Last of Us",
};

export { config };
