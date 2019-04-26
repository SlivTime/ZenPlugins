import { ensureSyncIDsAreUniqueButSanitized, sanitizeSyncId } from '../../common/accounts'
import { fetchAccounts, fetchTransactions, login } from './api'
import { mergeTransfers, convertAccounts, convertTransaction } from './converters'

export async function scrape ({ preferences, fromDate, toDate }) {
  toDate = toDate || new Date()

  const auth = await login(preferences.login, preferences.password)
  const apiPortfolios = await fetchAccounts(auth)

  const accountsData = convertAccounts(apiPortfolios)
  const accounts = []
  const transactions = []
  await Promise.all(accountsData.map(async ({ products, zenAccount }) => {
    accounts.push(zenAccount)
    if (ZenMoney.isAccountSkipped(zenAccount.id)) {
      return
    }
    let apiTransactions = null
    for (const product of products) {
      try {
        apiTransactions = await fetchTransactions(auth, product, fromDate, toDate)
        if (apiTransactions) {
          break
        }
      } catch (e) {
        if (!e.message || !['временно', 'Ошибка обращения', '[NER]'].some(pattern => e.message.indexOf(pattern) >= 0)) {
          throw e
        }
      }
    }
    if (apiTransactions) {
      apiTransactions.forEach(apiTransaction => {
        const transaction = convertTransaction(apiTransaction, zenAccount)
        if (transaction) {
          transactions.push(transaction)
        }
      })
    } else {
      console.log(`skipping transactions for account ${zenAccount.id}`)
    }
  }))

  return {
    accounts: ensureSyncIDsAreUniqueButSanitized({ accounts, sanitizeSyncId }),
    transactions: mergeTransfers(transactions)
  }
}
