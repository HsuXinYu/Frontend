//server-side rendering
export async function getServerSideProps({ params }) {
  const response = await fetch(`http://localhost:8080/students/${params._id}`);
  const data = await response.json();

  return {
    props: {
      data,
    },
  };
}

//static generation pages with dynamic routes
// export async function getStaticPaths() {
//   const response = await fetch("http://localhost:8080/students");
//   const data = await response.json();

//   //paths一定要符合Next.js格式,getStaticPaths()一定要return一個有paths屬性的物件,paths一定要是array of objects
//   //內部每個object都要有一個id的屬性且每個id都會被用來製作相對應的頁面
//   const paths = data.map((data) => {
//     return {
//       params: {
//         _id: data._id.toString(), //要轉換成字串
//       },
//     };
//   });

//   return {
//     paths,
//     fallback: false, //會自動生成404頁面
//   };
// }

// export async function getStaticProps({ params }) {
//   const response = await fetch(`http://localhost:8080/students/${params._id}`);
//   const data = await response.json();

//   return {
//     props: {
//       data,
//     },
//   };
// }

export default function StudentProfile({ data }) {
  return (
    <div>
      <h1>{data.name}</h1>
      <h1>{data.age}</h1>
      <h1>{data.major}</h1>
      <h1>{data.scholarship.merit}</h1>
      <h1>{data.scholarship.other}</h1>
    </div>
  );
}
