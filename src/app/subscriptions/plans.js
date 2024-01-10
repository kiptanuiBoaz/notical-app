export const plans = [
    {
        title: 'Monthly',
        features: ['Two-way synchronization', 'Customizable Sync Range', 'Selective Databse Synchronization'],
        price: '$9.99',
        trial: 5,
        cta: 'Get started',
        range: "month",
        priceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID
    },
    {
        title: 'Yearly',
        features: ['Two-way synchronization', 'Customizable Sync Range', 'Selective Databse Synchronization'],
        price: '$72.00',
        trial: 14,
        cta: 'Go Yearly',
        range: "year",
        priceId: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID
    },

];