function dumbVoucher(voucher, prices) {
  let discount = 0;
  let moneySpent = prices;
  let change = 0;

  if (voucher === "DumbWaysJos") {
    if (prices >= 50000) {
      discount = prices * 0.211;
      if (discount > 20000) {
        discount = 20000;
      }
      moneySpent = prices - discount;
    }
  } else if (voucher === "DumbWaysMantap") {
    if (prices >= 80000) {
      discount = prices * 0.3;
      if (discount > 40000) {
        discount = 40000;
      }
      moneySpent = prices - discount;
    }
  } else if (voucher === "DumbwaysKeren") {
    if (prices >= 100000) {
      discount = prices * 0.5;
      if (discount > 50000) {
        discount = 50000;
      }
      moneySpent = prices - discount;
    }
  }

  change = prices - moneySpent;

  console.log("Uang yang harus dibayar : " + moneySpent);
  console.log("Diskon : " + discount);
  console.log("Kembalian : " + change);
}

dumbVoucher("DumbWaysJos", 40000);
dumbVoucher("DumbWaysJos", 100000);
dumbVoucher("DumbwaysKeren", 100000);
