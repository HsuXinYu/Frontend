import { useEffect, useState } from "react";
import Link from "next/link";

//server-side rendering，每次有http request都會執行
export async function getServerSideProps() {
  const response = await fetch("http://localhost:8080/students");
  const data = await response.json();

  return {
    props: {
      data,
    },
  };
}

//static generation with dynamic routes
// export async function getStaticProps() {
//   const response = await fetch("http://localhost:8080/students");
//   const data = await response.json();

//   return {
//     props: {
//       data,
//     },
//   };
// }

export default function Profile({ data }) {
  //client-side rendering
  // const [data, setData] = useState(null);
  // const [isLoading, setLoading] = useState(false);

  // useEffect(() => {
  //   const myFunction = async () => {
  //     setLoading(true);
  //     let response = await fetch("http://localhost:8080/students");
  //     let data = await response.json();
  //     setData(data);
  //     setLoading(false);
  //   };
  //   myFunction();
  // }, []);

  return (
    <div>
      {/* <h1>{isLoading && "Loading"}</h1>
      {data &&
        data.map((data) => {
          return <h1>{data.name + " " + data._id}</h1>;
        })} */}

      {data &&
        data.map((data) => {
          return (
            <Link style={{ padding: "2rem" }} href={`profile/${data._id}`}>
              {data.name}
            </Link>
          );
        })}
    </div>
  );
}
