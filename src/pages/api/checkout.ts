import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const { items } = req.body; // Espera um array de itens

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Items not found or invalid." });
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}/`;

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      success_url: successUrl,
      cancel_url: cancelUrl,
      mode: "payment",
      line_items: items.map((item) => ({
        price: item.price, // ID do preço no Stripe
        quantity: item.quantity, // Quantidade do produto
      })),
    });

    return res.status(201).json({ checkoutUrl: checkoutSession.url });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Failed to create checkout session." });
  }
}
