import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.goldsky.com/api/public/project_cm3dcsjvvwzvl01xjc96ng3d0/subgraphs/usde-payment-tracking-ethena-testnet/v1/gn',
  cache: new InMemoryCache(),
});

const GET_TRANSFERS = gql`
  query {
    transfers(
      where: {
        to: "0x15a5f0cc0ebbd6af48100885bb0c217457b01d14"
      },
      orderBy: timestamp_,
      orderDirection: asc
    ) {
      id
      from
      to
      value
      timestamp_
      transactionHash_
    }
  }
`;

export const fetchTransfersFromSubgraph = async () => {
  try {
    const { data } = await client.query({ query: GET_TRANSFERS });
    return data.transfers;
  } catch (error) {
    console.error("Error fetching data from subgraph:", error);
    return [];
  }
};
