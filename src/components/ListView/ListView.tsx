import React from "react";

interface Props<T> {
  list: T[];
}

const ListView = <T,>({ list }: Props<T>) => {
  return (
    <div className="list-view">
      <h1>List Title</h1>
      {list.map((listItem: T, index: number) => (
        <h2>{index}</h2>
      ))}
    </div>
  );
};

export default ListView;
