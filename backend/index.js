const { ApolloServer, gql } = require("apollo-server");

// スキーマとは、データに対して実行されるクエリの「形」を定義する型定義の集合体（したがって「typeDefs」）である。
const typeDefs = gql`
  # GraphQLの文字列のコメント（このようなもの）は、ハッシュ（#）記号で始まります。

  # この "Book "型は、データソースのすべての本に対してクエリ可能なフィールドを定義します。
  type Book {
    title: String
    author: String
  }

  # "Query "型は特殊で、利用可能なすべてのクエリをリストアップします。
  # クライアントが実行可能で、それぞれの戻り値の型も示されています。この場合
  # この場合、"books "クエリは0個以上のBook（上で定義）の配列を返します。
  type Query {
    books: [Book]
  }
`;

// データ本体
const books = [
  {
    title: "The Awakening",
    author: "田中 太郎",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

// リゾルバは、その中で定義された型を取得するための技術を定義する。スキーマを使用します。
// このリゾルバは、上の "books" 配列から書籍を取得します。
const resolvers = {
  Query: {
    books: () => books,
  },
};

// ApolloServerのコンストラクタは、2つのパラメータを必要とします
// ・スキーマ の定義と、リゾルバのセットです。
const server = new ApolloServer({ typeDefs, resolvers });

// listenメソッドは、ウェブサーバーを起動します。
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
