// 函式名稱一定要是getStaticProps()且只能放在pages
export async function getStaticProps() {
  const response = await fetch("http://localhost:8080/students");
  const data = await response.json();

  //getStaticProps()一定要return一個物件，且物件內的屬性一定要是Props，Props屬性會自動被Next.js使用
  return {
    props: {
      data,
    },
  };
}

export default function StaticGenerationPage({ data }) {
  return (
    <div>
      {data.map((data) => {
        return <h1>{data.name}</h1>;
      })}
    </div>
  );
}
