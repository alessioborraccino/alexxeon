import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "nulp5uls", // find this at manage.sanity.io or in your sanity.json
  dataset: "production", // this is from those question during 'sanity init'
  apiVersion: '2022-01-01',
  useCdn: true,
});