/**
 *
 * @param {String} role
 * @param {String} email
 * @param {String} password
 * @returns
 */
function templateCreateAccount(role, email, password) {
	return `Félicitations!<br /><br />
    Votre compte ${role} POP a été créé avec succès.<br /><br />
    Le lien vers la plateforme de production est le suivant : <a href="http://production.pop.culture.gouv.fr">http://production.pop.culture.gouv.fr</a><br />
    Le lien vers la plateforme de diffusion est le suivant : <a href="https://www.pop.culture.gouv.fr/">https://www.pop.culture.gouv.fr/</a><br /><br />
    Votre identifiant de connexion est ${email}<br />
    Votre mot de passe provisoire est ${password}<br />
    Nous vous recommandons de modifier votre mot de passe le plus rapidement possible en cliquant en haut à droite lors de votre connexion<br /><br />
    L'équipe POP<br />
    Et en cas de problème, vous pouvez contacter pop@culture.gouv.fr<br />`;
}

/**
 *
 * @param {String} password
 * @returns
 */
function templateForgetPassword(password) {
	return `Bonjour!<br /><br />
    Votre nouveau mot de passe provisoire est ${password}<br />
    Nous vous recommandons de modifier votre mot de passe le plus rapidement 
    possible en cliquant en haut à droite lors de votre connexion<br /><br />
    L'équipe POP<br />
    Et en cas de problème, vous pouvez toujours nous contacter à pop@culture.gouv.fr<br />`;
}

module.exports = {
	templateCreateAccount,
	templateForgetPassword,
};
