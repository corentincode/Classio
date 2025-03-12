"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Shield, Lock, FileText, AlertCircle, ChevronRight } from "lucide-react"
import Header from "@/components/sections/header"
import Footer from "@/components/sections/footer"

// Animations
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function LegalPage() {
  const [activeTab, setActiveTab] = useState<string>("mentions-legales")

  // Fonction pour gérer le changement d'onglet
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    // Mise à jour de l'URL sans rechargement de page
    window.history.pushState({}, "", `#${tab}`)
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 bg-white">
          <div className="container max-w-6xl mx-auto">
            <Link href="/" className="inline-flex items-center text-[#c83e3e] mb-8 hover:underline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
                Informations <span className="text-[#c83e3e]">légales</span>
              </h1>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Mentions légales, politique de confidentialité et conditions d'utilisation de Classio
              </p>
            </motion.div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="py-4 bg-[#f5f0e8]/30 border-y border-[#f5f0e8]">
          <div className="container max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              <TabButton
                active={activeTab === "mentions-legales"}
                onClick={() => handleTabChange("mentions-legales")}
                icon={<FileText className="h-4 w-4" />}
                label="Mentions légales"
              />
              <TabButton
                active={activeTab === "politique-confidentialite"}
                onClick={() => handleTabChange("politique-confidentialite")}
                icon={<Lock className="h-4 w-4" />}
                label="Politique de confidentialité"
              />
              <TabButton
                active={activeTab === "cookies"}
                onClick={() => handleTabChange("cookies")}
                icon={<Shield className="h-4 w-4" />}
                label="Cookies"
              />
              <TabButton
                active={activeTab === "conditions-utilisation"}
                onClick={() => handleTabChange("conditions-utilisation")}
                icon={<AlertCircle className="h-4 w-4" />}
                label="Conditions d'utilisation"
              />
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 bg-white">
          <div className="container max-w-4xl mx-auto">
            {/* Mentions Légales */}
            {activeTab === "mentions-legales" && (
              <motion.div
                key="mentions-legales"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="prose max-w-none"
              >
                <h2 className="text-2xl font-bold mb-6">Mentions légales</h2>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3">1. Éditeur du site</h3>
                  <p className="text-gray-700 mb-4">
                    Le site Classio est édité par la société Classio SAS, société par actions simplifiée au capital de
                    10 000 euros, immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro 123 456
                    789, dont le siège social est situé au 123 Rue de la Liberté, 75001 Paris, France.
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>Numéro de TVA intracommunautaire :</strong> FR 12 345 678 901
                    <br />
                    <strong>Numéro de téléphone :</strong> +33 1 23 45 67 89
                    <br />
                    <strong>Email :</strong> contact@classio.fr
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>Directeur de la publication :</strong> Corentin Adelé, en qualité de Président de Classio
                    SAS.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3">2. Hébergement</h3>
                  <p className="text-gray-700 mb-4">
                    Le site Classio est hébergé par la société Vercel Inc., dont le siège social est situé au 340 S
                    Lemon Ave #4133, Walnut, CA 91789, USA.
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>Téléphone :</strong> +1 (559) 288-7060
                    <br />
                    <strong>Site web :</strong>{" "}
                    <a
                      href="https://vercel.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#c83e3e] hover:underline"
                    >
                      https://vercel.com
                    </a>
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3">3. Propriété intellectuelle</h3>
                  <p className="text-gray-700 mb-4">
                    L'ensemble du contenu du site Classio, incluant, de façon non limitative, les graphismes, images,
                    textes, vidéos, animations, sons, logos, gifs et icônes ainsi que leur mise en forme sont la
                    propriété exclusive de Classio SAS à l'exception des marques, logos ou contenus appartenant à
                    d'autres sociétés partenaires ou auteurs.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même
                    partielle, de ces différents éléments est strictement interdite sans l'accord exprès par écrit de
                    Classio SAS. Cette représentation ou reproduction, par quelque procédé que ce soit, constitue une
                    contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3">4. Responsabilité</h3>
                  <p className="text-gray-700 mb-4">
                    Les informations contenues sur ce site sont aussi précises que possible et le site est
                    périodiquement remis à jour, mais peut toutefois contenir des inexactitudes, des omissions ou des
                    lacunes. Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, merci de
                    bien vouloir le signaler par email à contact@classio.fr en décrivant le problème de la manière la
                    plus précise possible.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Tout contenu téléchargé se fait aux risques et périls de l'utilisateur et sous sa seule
                    responsabilité. En conséquence, Classio SAS ne saurait être tenu responsable d'un quelconque dommage
                    subi par l'ordinateur de l'utilisateur ou d'une quelconque perte de données consécutives au
                    téléchargement.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3">5. Liens hypertextes</h3>
                  <p className="text-gray-700 mb-4">
                    Le site Classio peut contenir des liens hypertextes vers d'autres sites présents sur le réseau
                    Internet. Les liens vers ces autres ressources vous font quitter le site Classio. Il est possible de
                    créer un lien vers la page de présentation de ce site sans autorisation expresse de Classio SAS.
                    Aucune autorisation ou demande d'information préalable ne peut être exigée par l'éditeur à l'égard
                    d'un site qui souhaite établir un lien vers le site de l'éditeur. Néanmoins, Classio SAS se réserve
                    le droit de demander la suppression d'un lien qu'il estime non conforme à l'objet du site Classio.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3">6. Droit applicable et juridiction compétente</h3>
                  <p className="text-gray-700 mb-4">
                    Les présentes mentions légales sont régies par la loi française. En cas de litige, les tribunaux
                    français seront seuls compétents.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Pour toute question relative aux présentes mentions légales, vous pouvez nous contacter à l'adresse
                    email : contact@classio.fr
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3">7. Mise à jour</h3>
                  <p className="text-gray-700 mb-4">
                    Les présentes mentions légales ont été mises à jour le 12 mars 2025.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Politique de Confidentialité */}
            {activeTab === "politique-confidentialite" && (
              <motion.div
                key="politique-confidentialite"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="prose max-w-none"
              >
                <h2 className="text-2xl font-bold mb-6">Politique de confidentialité</h2>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3">1. Introduction</h3>
                  <p className="text-gray-700 mb-4">
                    Classio SAS s'engage à protéger la vie privée des utilisateurs de son site web et de sa plateforme.
                    Cette politique de confidentialité explique comment nous collectons, utilisons, partageons et
                    protégeons vos informations personnelles lorsque vous utilisez notre site web et nos services.
                  </p>
                  <p className="text-gray-700 mb-4">
                    En utilisant notre site web et nos services, vous acceptez les pratiques décrites dans cette
                    politique de confidentialité. Si vous n'acceptez pas cette politique, veuillez ne pas utiliser notre
                    site web ou nos services.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3">2. Collecte des informations</h3>
                  <p className="text-gray-700 mb-4">
                    Nous collectons différents types d'informations auprès de nos utilisateurs, notamment :
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li className="mb-2">
                      <strong>Informations d'identification :</strong> nom, prénom, adresse email, numéro de téléphone,
                      fonction, établissement scolaire.
                    </li>
                    <li className="mb-2">
                      <strong>Informations de connexion :</strong> adresse IP, type de navigateur, pages visitées, temps
                      passé sur le site, date et heure de connexion.
                    </li>
                    <li className="mb-2">
                      <strong>Informations de paiement :</strong> coordonnées bancaires (traitées de manière sécurisée
                      par nos prestataires de paiement).
                    </li>
                    <li className="mb-2">
                      <strong>Informations relatives à l'utilisation :</strong> données sur la façon dont vous utilisez
                      notre plateforme et nos services.
                    </li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3">3. Utilisation des informations</h3>
                  <p className="text-gray-700 mb-4">Nous utilisons les informations collectées pour :</p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li className="mb-2">Fournir, maintenir et améliorer nos services.</li>
                    <li className="mb-2">Traiter les transactions et envoyer les notifications associées.</li>
                    <li className="mb-2">
                      Communiquer avec vous concernant votre compte, nos services, promotions et événements.
                    </li>
                    <li className="mb-2">Personnaliser votre expérience utilisateur.</li>
                    <li className="mb-2">
                      Analyser l'utilisation de notre site web et de nos services pour améliorer nos offres.
                    </li>
                    <li className="mb-2">Détecter, prévenir et résoudre les problèmes techniques et de sécurité.</li>
                    <li className="mb-2">Se conformer aux obligations légales.</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3">4. Partage des informations</h3>
                  <p className="text-gray-700 mb-4">
                    Nous ne vendons pas vos informations personnelles à des tiers. Nous pouvons partager vos
                    informations dans les situations suivantes :
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li className="mb-2">
                      <strong>Prestataires de services :</strong> nous travaillons avec des entreprises tierces qui nous
                      aident à exploiter, fournir, améliorer, comprendre, personnaliser, soutenir et commercialiser nos
                      services.
                    </li>
                    <li className="mb-2">
                      <strong>Conformité légale :</strong> nous pouvons divulguer vos informations si la loi l'exige ou
                      si nous croyons de bonne foi que cette divulgation est nécessaire pour se conformer à la loi,
                      protéger nos droits ou répondre à une procédure judiciaire.
                    </li>
                    <li className="mb-2">
                      <strong>Transferts d'entreprise :</strong> en cas de fusion, acquisition ou vente d'actifs, vos
                      informations peuvent faire partie des actifs transférés.
                    </li>
                    <li className="mb-2">
                      <strong>Avec votre consentement :</strong> nous pouvons partager vos informations avec des tiers
                      lorsque vous nous donnez votre consentement pour le faire.
                    </li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3">5. Protection des données</h3>
                  <p className="text-gray-700 mb-4">
                    Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour
                    protéger vos informations personnelles contre la perte, l'accès non autorisé, la divulgation,
                    l'altération et la destruction. Ces mesures comprennent le chiffrement des données, les contrôles
                    d'accès, les pare-feu et les audits de sécurité réguliers.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Cependant, aucune méthode de transmission sur Internet ou de stockage électronique n'est totalement
                    sécurisée. Par conséquent, bien que nous nous efforcions de protéger vos informations personnelles,
                    nous ne pouvons garantir leur sécurité absolue.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3">6. Vos droits</h3>
                  <p className="text-gray-700 mb-4">
                    Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits
                    suivants concernant vos données personnelles :
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li className="mb-2">Droit d'accès à vos données personnelles.</li>
                    <li className="mb-2">Droit de rectification des données inexactes.</li>
                    <li className="mb-2">Droit à l'effacement de vos données (« droit à l'oubli »).</li>
                    <li className="mb-2">Droit à la limitation du traitement.</li>
                    <li className="mb-2">Droit à la portabilité des données.</li>
                    <li className="mb-2">Droit d'opposition au traitement.</li>
                    <li className="mb-2">
                      Droit de ne pas faire l'objet d'une décision fondée exclusivement sur un traitement automatisé.
                    </li>
                  </ul>
                  <p className="text-gray-700 mb-4">
                    Pour exercer ces droits, veuillez nous contacter à l'adresse email : privacy@classio.fr
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3">7. Conservation des données</h3>
                  <p className="text-gray-700 mb-4">
                    Nous conservons vos informations personnelles aussi longtemps que nécessaire pour fournir nos
                    services et atteindre les objectifs décrits dans cette politique de confidentialité, sauf si une
                    période de conservation plus longue est requise ou permise par la loi.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Lorsque nous n'avons plus besoin de traiter vos informations personnelles, nous les supprimons de
                    nos systèmes ou les anonymisons de manière à ce que vous ne puissiez plus être identifié.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3">8. Modifications de la politique de confidentialité</h3>
                  <p className="text-gray-700 mb-4">
                    Nous pouvons modifier cette politique de confidentialité de temps à autre. Si nous apportons des
                    modifications importantes, nous vous en informerons par email ou par un avis sur notre site web
                    avant que les modifications ne prennent effet.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Nous vous encourageons à consulter régulièrement cette politique pour rester informé de la façon
                    dont nous protégeons vos informations.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3">9. Contact</h3>
                  <p className="text-gray-700 mb-4">
                    Si vous avez des questions ou des préoccupations concernant cette politique de confidentialité ou
                    nos pratiques en matière de protection des données, veuillez nous contacter à :
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>Email :</strong> privacy@classio.fr
                    <br />
                    <strong>Adresse postale :</strong> Classio SAS, 123 Rue de la Liberté, 75001 Paris, France
                    <br />
                    <strong>Délégué à la protection des données :</strong> dpo@classio.fr
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3">10. Mise à jour</h3>
                  <p className="text-gray-700 mb-4">
                    Cette politique de confidentialité a été mise à jour le 12 mars 2025.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Cookies */}
            {activeTab === "cookies" && (
              <motion.div
                key="cookies"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="prose max-w-none"
              >
                <h2 className="text-2xl font-bold mb-6">Politique relative aux cookies</h2>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3">1. Qu'est-ce qu'un cookie ?</h3>
                  <p className="text-gray-700 mb-4">
                    Un cookie est un petit fichier texte qui est stocké sur votre ordinateur, tablette ou smartphone
                    lorsque vous visitez un site web. Les cookies permettent au site web de reconnaître votre appareil
                    et de mémoriser vos actions et préférences (comme la connexion, la langue, la taille de la police et
                    d'autres préférences d'affichage) pendant une période déterminée.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3">2. Comment utilisons-nous les cookies ?</h3>
                  <p className="text-gray-700 mb-4">
                    Classio utilise différents types de cookies pour les finalités suivantes :
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li className="mb-2">
                      <strong>Cookies essentiels :</strong> ces cookies sont nécessaires au fonctionnement du site web
                      et ne peuvent pas être désactivés dans nos systèmes. Ils sont généralement établis en réponse à
                      des actions que vous effectuez et qui constituent une demande de services, telles que la
                      définition de vos préférences de confidentialité, la connexion ou le remplissage de formulaires.
                      Vous pouvez configurer votre navigateur pour qu'il bloque ou vous avertisse de l'existence de ces
                      cookies, mais certaines parties du site ne fonctionneront pas.
                    </li>
                    <li className="mb-2">
                      <strong>Cookies de performance :</strong> ces cookies nous permettent de compter les visites et
                      les sources de trafic afin de mesurer et d'améliorer les performances de notre site. Ils nous
                      aident à savoir quelles pages sont les plus et les moins populaires et à voir comment les
                      visiteurs se déplacent sur le site. Toutes les informations recueillies par ces cookies sont
                      agrégées et donc anonymes.
                    </li>
                    <li className="mb-2">
                      <strong>Cookies de fonctionnalité :</strong> ces cookies permettent au site web d'offrir une
                      fonctionnalité et une personnalisation améliorées. Ils peuvent être mis en place par nous ou par
                      des fournisseurs tiers dont nous avons ajouté les services à nos pages. Si vous n'autorisez pas
                      ces cookies, certains ou tous ces services peuvent ne pas fonctionner correctement.
                    </li>
                    <li className="mb-2">
                      <strong>Cookies de ciblage :</strong> ces cookies peuvent être mis en place sur notre site par nos
                      partenaires publicitaires. Ils peuvent être utilisés par ces entreprises pour établir un profil de
                      vos intérêts et vous proposer des publicités pertinentes sur d'autres sites. Ils ne stockent pas
                      directement des informations personnelles, mais sont basés sur l'identification unique de votre
                      navigateur et de votre appareil Internet.
                    </li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3">3. Liste des cookies utilisés</h3>
                  <p className="text-gray-700 mb-4">Voici la liste des cookies que nous utilisons sur notre site :</p>
                  <table className="min-w-full border border-[#f5f0e8] mb-4">
                    <thead className="bg-[#f5f0e8]">
                      <tr>
                        <th className="py-2 px-4 border-b border-[#f5f0e8] text-left">Nom du cookie</th>
                        <th className="py-2 px-4 border-b border-[#f5f0e8] text-left">Type</th>
                        <th className="py-2 px-4 border-b border-[#f5f0e8] text-left">Durée</th>
                        <th className="py-2 px-4 border-b border-[#f5f0e8] text-left">Finalité</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2 px-4 border-b border-[#f5f0e8]">classio_session</td>
                        <td className="py-2 px-4 border-b border-[#f5f0e8]">Essentiel</td>
                        <td className="py-2 px-4 border-b border-[#f5f0e8]">Session</td>
                        <td className="py-2 px-4 border-b border-[#f5f0e8]">Maintient votre session active</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b border-[#f5f0e8]">classio_preferences</td>
                        <td className="py-2 px-4 border-b border-[#f5f0e8]">Fonctionnalité</td>
                        <td className="py-2 px-4 border-b border-[#f5f0e8]">1 an</td>
                        <td className="py-2 px-4 border-b border-[#f5f0e8]">Enregistre vos préférences</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b border-[#f5f0e8]">_ga</td>
                        <td className="py-2 px-4 border-b border-[#f5f0e8]">Performance</td>
                        <td className="py-2 px-4 border-b border-[#f5f0e8]">2 ans</td>
                        <td className="py-2 px-4 border-b border-[#f5f0e8]">
                          Google Analytics - Distingue les utilisateurs
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b border-[#f5f0e8]">_gid</td>
                        <td className="py-2 px-4 border-b border-[#f5f0e8]">Performance</td>
                        <td className="py-2 px-4 border-b border-[#f5f0e8]">24 heures</td>
                        <td className="py-2 px-4 border-b border-[#f5f0e8]">
                          Google Analytics - Distingue les utilisateurs
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b border-[#f5f0e8]">_fbp</td>
                        <td className="py-2 px-4 border-b border-[#f5f0e8]">Ciblage</td>
                        <td className="py-2 px-4 border-b border-[#f5f0e8]">3 mois</td>
                        <td className="py-2 px-4 border-b border-[#f5f0e8]">Facebook - Suivi des conversions</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3">4. Comment gérer les cookies ?</h3>
                  <p className="text-gray-700 mb-4">
                    Vous pouvez contrôler et/ou supprimer les cookies selon vos préférences. La plupart des navigateurs
                    web permettent un certain contrôle de la plupart des cookies via les paramètres du navigateur. Pour
                    en savoir plus sur les cookies, y compris comment voir quels cookies ont été définis et comment les
                    gérer et les supprimer, visitez www.allaboutcookies.org.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Vous pouvez supprimer tous les cookies déjà présents sur votre ordinateur et vous pouvez configurer
                    la plupart des navigateurs pour les empêcher d'être placés. Toutefois, si vous faites cela, vous
                    devrez peut-être ajuster manuellement certaines préférences chaque fois que vous visitez un site, et
                    certains services et fonctionnalités pourraient ne pas fonctionner.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Voici comment gérer les cookies dans les principaux navigateurs :
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li className="mb-2">
                      <strong>Chrome :</strong> Menu &gt; Paramètres &gt; Afficher les paramètres avancés &gt;
                      Confidentialité &gt; Paramètres de contenu &gt; Cookies
                    </li>
                    <li className="mb-2">
                      <strong>Firefox :</strong> Menu &gt; Options &gt; Vie privée &gt; Historique &gt; Paramètres
                      personnalisés &gt; Cookies
                    </li>
                    <li className="mb-2">
                      <strong>Safari :</strong> Préférences &gt; Confidentialité &gt; Cookies
                    </li>
                    <li className="mb-2">
                      <strong>Edge :</strong> Menu &gt; Paramètres &gt; Afficher les paramètres avancés &gt; Cookies
                    </li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3">5. Mise à jour de notre politique relative aux cookies</h3>
                  <p className="text-gray-700 mb-4">
                    Nous pouvons mettre à jour cette politique relative aux cookies de temps à autre afin de refléter,
                    par exemple, les changements apportés aux cookies que nous utilisons ou pour d'autres raisons
                    opérationnelles, légales ou réglementaires. Veuillez donc consulter régulièrement cette politique
                    pour rester informé de notre utilisation des cookies et des technologies connexes.
                  </p>
                  <p className="text-gray-700 mb-4">
                    La date en haut de cette politique indique quand elle a été mise à jour pour la dernière fois.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3">6. Contact</h3>
                  <p className="text-gray-700 mb-4">
                    Si vous avez des questions concernant notre utilisation des cookies, veuillez nous contacter à
                    l'adresse email : privacy@classio.fr
                  </p>
                </div>
              </motion.div>
            )}

            {/* Conditions d'utilisation */}
            {activeTab === "conditions-utilisation" && (
              <motion.div
                key="conditions-utilisation"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="prose max-w-none"
              >
                <h2 className="text-2xl font-bold mb-6">Conditions générales d'utilisation</h2>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3">1. Acceptation des conditions</h3>
                  <p className="text-gray-700 mb-4">
                    En accédant et en utilisant le site web et les services de Classio, vous acceptez d'être lié par les
                    présentes conditions générales d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas
                    utiliser notre site web ou nos services.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3">2. Description du service</h3>
                  <p className="text-gray-700 mb-4">
                    Classio est une plateforme tout-en-un pour les établissements scolaires qui réunit les
                    fonctionnalités de gestion des notes, des absences, des emplois du temps et de communication en une
                    seule application. Nos services sont destinés à être utilisés par les établissements scolaires, les
                    enseignants, le personnel administratif, les élèves et leurs parents.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3">3. Inscription et compte</h3>
                  <p className="text-gray-700 mb-4">
                    Pour utiliser certains aspects de nos services, vous devez créer un compte. Vous êtes responsable de
                    maintenir la confidentialité de vos informations de compte et de toutes les activités qui se
                    produisent sous votre compte. Vous acceptez de nous informer immédiatement de toute utilisation non
                    autorisée de votre compte ou de toute autre violation de la sécurité.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Vous devez fournir des informations exactes, actuelles et complètes lors de l'inscription et
                    maintenir ces informations à jour. Nous nous réservons le droit de suspendre ou de résilier votre
                    compte si nous avons des raisons de croire que les informations que vous avez fournies sont
                    inexactes, trompeuses ou incomplètes.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3">4. Utilisation du service</h3>
                  <p className="text-gray-700 mb-4">
                    Vous acceptez d'utiliser nos services uniquement à des fins légales et conformément aux présentes
                    conditions. Vous acceptez de ne pas utiliser nos services pour :
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li className="mb-2">Violer les lois ou réglementations applicables.</li>
                    <li className="mb-2">
                      Enfreindre les droits de propriété intellectuelle ou autres droits de tiers.
                    </li>
                    <li className="mb-2">
                      Transmettre des virus, des logiciels malveillants ou d'autres codes nuisibles.
                    </li>
                    <li className="mb-2">
                      Interférer avec ou perturber l'intégrité ou les performances de nos services.
                    </li>
                    <li className="mb-2">
                      Collecter ou stocker des informations personnelles sur d'autres utilisateurs sans leur
                      consentement.
                    </li>
                    <li className="mb-2">Se faire passer pour une autre personne ou entité.</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3">5. Contenu de l'utilisateur</h3>
                  <p className="text-gray-700 mb-4">
                    Nos services permettent aux utilisateurs de publier, de télécharger, de stocker ou de partager du
                    contenu. Vous conservez tous les droits de propriété intellectuelle sur le contenu que vous
                    soumettez, mais vous nous accordez une licence mondiale, non exclusive, libre de redevance,
                    transférable et pouvant faire l'objet d'une sous-licence pour utiliser, reproduire, modifier,
                    adapter, publier, traduire, distribuer et afficher ce contenu dans le cadre de la fourniture de nos
                    services.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Vous êtes seul responsable du contenu que vous soumettez et des conséquences de sa publication ou de
                    son partage. Vous déclarez et garantissez que vous avez tous les droits nécessaires pour accorder la
                    licence ci-dessus et que le contenu que vous soumettez ne viole pas les droits de tiers ou les lois
                    applicables.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3">6. Propriété intellectuelle</h3>
                  <p className="text-gray-700 mb-4">
                    Tous les droits de propriété intellectuelle sur nos services et leur contenu (à l'exception du
                    contenu fourni par les utilisateurs) appartiennent à Classio SAS ou à ses concédants de licence.
                    Vous ne pouvez pas utiliser, copier, reproduire, distribuer, transmettre, diffuser, afficher,
                    vendre, concéder sous licence ou exploiter de quelque manière que ce soit tout contenu obtenu par le
                    biais de nos services sans notre autorisation écrite préalable.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3">7. Paiement et abonnement</h3>
                  <p className="text-gray-700 mb-4">
                    Certains de nos services sont payants. Si vous choisissez un service payant, vous acceptez de payer
                    tous les frais applicables selon les tarifs en vigueur au moment de votre achat. Tous les frais sont
                    non remboursables, sauf disposition contraire dans nos conditions ou exigée par la loi.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Les abonnements se renouvellent automatiquement pour des périodes successives de même durée que la
                    période initiale, sauf si vous annulez votre abonnement avant la fin de la période en cours. Vous
                    pouvez annuler votre abonnement à tout moment en accédant à votre compte ou en nous contactant.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Nous nous réservons le droit de modifier nos tarifs à tout moment. Toute modification de prix
                    prendra effet au début de la période de facturation suivante.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3">8. Limitation de responsabilité</h3>
                  <p className="text-gray-700 mb-4">
                    Dans toute la mesure permise par la loi applicable, Classio SAS ne sera pas responsable des dommages
                    indirects, accessoires, spéciaux, consécutifs ou punitifs, ou de toute perte de profits ou de
                    revenus, que ces dommages soient prévisibles ou non et même si Classio SAS a été informé de la
                    possibilité de tels dommages.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Notre responsabilité totale pour toute réclamation découlant de ou liée à nos services ne dépassera
                    pas le montant que vous avez payé pour nos services au cours des 12 mois précédant l'événement
                    donnant lieu à la responsabilité.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3">9. Indemnisation</h3>
                  <p className="text-gray-700 mb-4">
                    Vous acceptez de défendre, d'indemniser et de dégager de toute responsabilité Classio SAS, ses
                    dirigeants, administrateurs, employés et agents contre toute réclamation, responsabilité, dommage,
                    perte et dépense, y compris les frais juridiques et comptables raisonnables, découlant de ou liés à
                    votre violation des présentes conditions, votre utilisation de nos services ou votre violation des
                    droits d'un tiers.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3">10. Modifications des conditions</h3>
                  <p className="text-gray-700 mb-4">
                    Nous nous réservons le droit de modifier ces conditions à tout moment. Si nous apportons des
                    modifications importantes, nous vous en informerons par email ou par un avis sur notre site web
                    avant que les modifications ne prennent effet. Votre utilisation continue de nos services après la
                    date d'entrée en vigueur des conditions modifiées constitue votre acceptation de ces conditions.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3">11. Résiliation</h3>
                  <p className="text-gray-700 mb-4">
                    Nous nous réservons le droit de suspendre ou de résilier votre accès à nos services à tout moment,
                    pour quelque raison que ce soit et sans préavis. Vous pouvez également résilier votre compte à tout
                    moment en nous contactant ou en supprimant votre compte.
                  </p>
                  <p className="text-gray-700 mb-4">
                    En cas de résiliation, les dispositions des présentes conditions qui, par leur nature, devraient
                    survivre à la résiliation, survivront, y compris, mais sans s'y limiter, les dispositions relatives
                    à la propriété intellectuelle, les garanties, l'indemnisation et la limitation de responsabilité.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3">12. Droit applicable et juridiction</h3>
                  <p className="text-gray-700 mb-4">
                    Les présentes conditions sont régies par le droit français. Tout litige découlant de ou lié à ces
                    conditions sera soumis à la compétence exclusive des tribunaux de Paris, France.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3">13. Dispositions diverses</h3>
                  <p className="text-gray-700 mb-4">
                    Si une disposition des présentes conditions est jugée invalide ou inapplicable, cette disposition
                    sera limitée ou éliminée dans la mesure minimale nécessaire, et les dispositions restantes des
                    présentes conditions resteront pleinement en vigueur.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Notre incapacité à faire respecter un droit ou une disposition des présentes conditions ne
                    constituera pas une renonciation à ce droit ou à cette disposition. La renonciation à un tel droit
                    ou à une telle disposition ne sera effective que si elle est faite par écrit et signée par un
                    représentant dûment autorisé de Classio SAS.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3">14. Contact</h3>
                  <p className="text-gray-700 mb-4">
                    Si vous avez des questions concernant ces conditions, veuillez nous contacter à l'adresse email :
                    legal@classio.fr
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3">15. Mise à jour</h3>
                  <p className="text-gray-700 mb-4">
                    Ces conditions générales d'utilisation ont été mises à jour le 12 mars 2025.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

// Composant pour les boutons d'onglet
interface TabButtonProps {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
}

function TabButton({ active, onClick, icon, label }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
        active
          ? "bg-[#c83e3e] text-white shadow-md"
          : "bg-white text-gray-600 hover:bg-[#f5f0e8] border border-[#f5f0e8]"
      }`}
    >
      <span className="mr-2">{icon}</span>
      {label}
      {active && <ChevronRight className="ml-1 h-4 w-4 rotate-90" />}
    </button>
  )
}

