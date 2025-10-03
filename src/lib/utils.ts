export const cn = (...classes: (string | false | undefined)[]) => classes.filter(Boolean).join(" ");
export const currency = (n:number) => new Intl.NumberFormat('fr-FR', { style:'currency', currency:'EUR' }).format(n);
