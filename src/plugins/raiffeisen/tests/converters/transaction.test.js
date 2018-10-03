import { convertTransactions } from '../../converters'

describe('convertTransactions', () => {
  it('filters exact duplicates', () => {
    const transactions = convertTransactions([
      {
        type: 'TRANSACTION',
        date: '2018-03-12T00:00',
        matchDate: '2018-03-12T00:00',
        note: 'RC QW 110554007 utilities',
        currencyId: 'RUB',
        currency: {
          id: 'RUB',
          symbol: '₽',
          name: { name: 'Российский рубль' },
          precision: 2,
          code: '643',
          shortName: 'RUB',
          sort: 1
        },
        amount: -6250.84,
        billCurrencyId: 'RUB',
        billCurrency: {
          id: 'RUB',
          symbol: '₽',
          name: { name: 'Российский рубль' },
          precision: 2,
          code: '643',
          shortName: 'RUB',
          sort: 1
        },
        billAmount: -6250.84,
        relation: 'ACCOUNT',
        relatedId: 13675471,
        relatedName: { name: '*2996218' },
        relatedDescription: { name: 'RC QW 110554007 utilities' },
        accountType: { id: 4, name: 'Счет Кредитной карты' }
      },
      {
        type: 'TRANSACTION',
        date: '2018-03-12T00:00',
        matchDate: '2018-03-15T00:00',
        note: 'STEYK KHAUS BUTCHER MOSCOW RUS',
        merchant: 'STEYK KHAUS BUTCHER',
        city: 'MOSCOW      ',
        country: 'RUS',
        color: [ 'ff5253', 'ff5253', 'c1b2fa' ],
        parentCategoryId: 12,
        categoryId: 62,
        categoryPath: '/import/statement',
        currencyId: 'RUB',
        currency: {
          id: 'RUB',
          symbol: '₽',
          name: { name: 'Российский рубль' },
          precision: 2,
          code: '643',
          shortName: 'RUB',
          sort: 1
        },
        amount: -9850,
        billCurrencyId: 'RUB',
        billCurrency: {
          id: 'RUB',
          symbol: '₽',
          name: { name: 'Российский рубль' },
          precision: 2,
          code: '643',
          shortName: 'RUB',
          sort: 1
        },
        billAmount: -9850,
        pan: '*8547',
        relation: 'CARD',
        relatedId: 60336243,
        relatedName: { name: '*8547' },
        relatedDescription: { name: 'STEYK KHAUS BUTCHER MOSCOW RUS' }
      },
      {
        type: 'TRANSACTION',
        date: '2018-03-12T00:00',
        matchDate: '2018-03-12T00:00',
        note: 'RC QW 110554007 utilities',
        currencyId: 'RUB',
        currency: {
          id: 'RUB',
          symbol: '₽',
          name: { name: 'Российский рубль' },
          precision: 2,
          code: '643',
          shortName: 'RUB',
          sort: 1
        },
        amount: -6250.84,
        billCurrencyId: 'RUB',
        billCurrency: {
          id: 'RUB',
          symbol: '₽',
          name: { name: 'Российский рубль' },
          precision: 2,
          code: '643',
          shortName: 'RUB',
          sort: 1
        },
        billAmount: -6250.84,
        relation: 'ACCOUNT',
        relatedId: 13675471,
        relatedName: { name: '*2996218' },
        relatedDescription: { name: 'RC QW 110554007 utilities' },
        accountType: { id: 4, name: 'Счет Кредитной карты' }
      },
      {
        type: 'TRANSACTION',
        date: '2018-03-12T00:00',
        matchDate: '2018-03-14T00:00',
        note: '"WWF" MOSCOW RUS',
        merchant: '"WWF"',
        city: 'MOSCOW      ',
        country: 'RUS',
        color: ['80c783', '80c783', 'fee0c7'],
        parentCategoryId: 14,
        currencyId: 'RUB',
        currency: {
          id: 'RUB',
          symbol: '₽',
          name: { name: 'Российский рубль' },
          precision: 2,
          code: '643',
          shortName: 'RUB',
          sort: 1
        },
        amount: -1000,
        billCurrencyId: 'RUB',
        billCurrency: {
          id: 'RUB',
          symbol: '₽',
          name: { name: 'Российский рубль' },
          precision: 2,
          code: '643',
          shortName: 'RUB',
          sort: 1
        },
        billAmount: -1000,
        relation: 'CARD',
        relatedId: 60336243,
        relatedName: { name: '*8547' },
        relatedDescription: { name: '"WWF" MOSCOW RUS' }
      },
      {
        type: 'TRANSACTION',
        date: '2018-03-12T00:00',
        matchDate: '2018-03-14T00:00',
        note: '"WWF" MOSCOW RUS',
        merchant: '"WWF"',
        city: 'MOSCOW      ',
        country: 'RUS',
        color: ['80c783', '80c783', 'fee0c7'],
        parentCategoryId: 14,
        currencyId: 'RUB',
        currency: {
          id: 'RUB',
          symbol: '₽',
          name: { name: 'Российский рубль' },
          precision: 2,
          code: '643',
          shortName: 'RUB',
          sort: 1
        },
        amount: -1000,
        billCurrencyId: 'RUB',
        billCurrency: {
          id: 'RUB',
          symbol: '₽',
          name: { name: 'Российский рубль' },
          precision: 2,
          code: '643',
          shortName: 'RUB',
          sort: 1
        },
        billAmount: -1000,
        relation: 'CARD',
        relatedId: 60336243,
        relatedName: { name: '*8547' },
        relatedDescription: { name: '"WWF" MOSCOW RUS' }
      }
    ])
    expect(transactions.length).toEqual(3)
    expect(transactions[0].comment).toEqual('RC QW 110554007 utilities')
    expect(transactions[1].payee).toEqual('STEYK KHAUS BUTCHER')
    expect(transactions[2].payee).toEqual('"WWF"')
  })
})
