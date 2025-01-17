const mapPerdeData = (perde) => {
    return {
      id: perde.idprod,
      title: perde.title,
      category: perde.category,
      price: parseFloat(perde.price),
      oldPrice: perde.oldPrice ? parseFloat(perde.oldPrice) : null,
      rating: {
        rate: parseFloat(perde.rating.rate),
        count: perde.rating.count,
      },
      image: perde.image,
      description: perde.description,
      colors: perde.colors,
      orderAciklama: perde.orderAciklama,
      shippingCost: parseFloat(perde.shippingCost),
      indirim: perde.indirim ? "evet" : "hayır",
    };
  };
  
  module.exports = { mapPerdeData };
  