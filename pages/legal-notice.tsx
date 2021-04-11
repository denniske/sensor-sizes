import Head from 'next/head'
import Link from 'next/link'
import {createStylesheet} from '../src/helper/styles';

const useStyles = createStylesheet((theme) => ({
    container: {
        margin: 50,
        color: '#EEE',
    },
}));

export default function Privacy() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Head>
                <title>Compare Sensor Sizes - Impressum</title>
                <link rel="icon" href="/favicon.png"/>
            </Head>

            <h4>
                <Link href="/">
                    <a>Back to home</a>
                </Link>
            </h4>
            <h1>Impressum</h1>

            <p>
                Angaben gemäß § 5 TMG:<br/><br/>
                Jannik Tesch<br/>
                Dennis Keil<br/>
                Carl-Petersen-Str. 116b<br/>
                20535 Hamburg<br/>
            </p>

            <h2>Kontakt:</h2>

            <p>
                E-Mail: hello@sensorsizes.com
            </p>

            <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</h2>
            <p>
                Jannik Tesch<br/>
                Dennis Keil<br/>
                Carl-Petersen-Str. 116b<br/>
                20535 Hamburg</p>
            <p>Quelle: <i>erstellt mit dem <a href="http://www.e-recht24.de/impressum-generator.html"
                                              target="_blank">Impressum-Generator</a> von eRecht24.</i></p>
            <h2>Haftungsausschluss:</h2>
            <p><strong>Haftung für Inhalte</strong></p>
            <p>Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt.
                Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
                können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für
                eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
                Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
                verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
                überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
                Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der
                Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon
                unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
                Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
                Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte
                umgehend entfernen.</p>
            <p><strong>Haftung für Links</strong></p>
            <p>Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren
                Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
                fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte
                der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
                Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung
                auf mögliche Rechtsverstöße überprüft. Rechtswidrige
                Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente
                inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte
                einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen
                werden wir derartige Links umgehend entfernen.</p>
            <p><strong>Urheberrecht</strong></p>
            <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
                unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und
                jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen
                der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads
                und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen
                Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden,
                werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche
                gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten
                wir um einen entsprechenden Hinweis.
                Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.</p>
            <p><strong>Datenschutzerklärung</strong></p>
            <a href="/spezial/datenschutz">Datenschutz</a>

            <p><i>Quellverweis: <a href="http://www.e-recht24.de/muster-disclaimer.htm"
                                   target="_blank">Disclaimer</a> von eRecht24, dem Portal zum Internetrecht von
                Rechtsanwalt Sören Siebert, <a
                    href="http://www.e-recht24.de/artikel/datenschutz/6590-facebook-like-button-datenschutz-disclaimer.html"
                    target="_blank">Facebook Disclaimer von eRecht24</a>, <a
                    href="http://www.google.com/intl/de_ALL/analytics/tos.html" target="_blank">Datenschutzerklärung
                    Google Analytics</a>, <a
                    href="http://www.e-recht24.de/artikel/datenschutz/6635-datenschutz-rechtliche-risiken-bei-der-nutzung-von-google-analytics-und-googleadsense.html"
                    target="_blank">Google Adsense Haftungsausschluss</a></i></p>
            <p><strong>Amazon Partner</strong></p>

            <p>
                Die Website www.sensorsizes.com ist Teilnehmer des Partnerprogramms von Amazon Europe S.à r.l. und
                Partner des Werbeprogramms, das zur Bereitstellung eines Mediums für Websites konzipiert wurde,
                mittels dessen durch die Platzierung von Werbeanzeigen und Links zu Amazon.de
                Werbekostenerstattung verdient werden kann.
            </p>

            <h2>Nachweis der Bildquellen</h2>

            <p>
                Alle Bilder und Animationen sind soweit nicht anders angegeben von dem Team selbst
                erstellt worden.
            </p>

        </div>
    )
}
