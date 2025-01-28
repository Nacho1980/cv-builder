import {
  Document,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

export const Template1Column = ({
  data,
  color,
  bgColor,
  headingColor,
}: {
  data: any;
  color: string;
  bgColor: string;
  headingColor: string;
}) => {
  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontSize: 12,
      lineHeight: 1.5,
      color: color,
      backgroundColor: bgColor,
    },
    title: {
      fontSize: 32,
      whiteSpace: "normal", // Allows text to wrap normally
      overflowWrap: "break-word", // Prevents word breaks
      wordWrap: "normal", // Ensures no word wrapping happens
      lineHeight: 1.2, // Ensures proper line spacing between lines
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 10,
    },
    section: {
      marginBottom: 20,
      paddingBottom: 10,
    },
    outlinedSection: {
      marginBottom: 20,
      backgroundColor: headingColor,
    },
    sectionWithBorderBottom: {
      marginBottom: 20,
      paddingBottom: 10,
      borderBottom: `1px solid ${headingColor}`,
    },
    heading: {
      fontSize: 16,
      marginBottom: 10,
      fontWeight: 300,
      color: headingColor,
      borderBottom: `1px solid ${headingColor}`,
    },
    text: {
      fontFamily: "Helvetica", // Default Helvetica font
      marginBottom: 5,
    },
    bold: {
      fontFamily: "Helvetica-Bold", // Use the bold variant
      fontWeight: "bold",
    },
    listItem: {
      marginLeft: 10,
    },
    flexRow: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    expHeader: {
      fontWeight: 300,
    },
    expPosition: {
      fontStyle: "italic",
    },
    // Bar for language level
    languageContainer: {
      marginBottom: 10,
    },
    languageLabel: {
      fontSize: 12,
      marginBottom: 5,
    },
    languageBarContainer: {
      height: 10,
      width: "100%",
      backgroundColor: "#e0e0e0", // Light gray background
      borderRadius: 5,
      overflow: "hidden",
    },
    languageBar: {
      height: "100%",
      backgroundColor: "#4caf50", // Green for the filled level
    },
  });

  const hyphenationCallback = (word: string) => {
    // Simply return the word unchanged to avoid any breaks
    return [word];
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Personal Data Section */}
        <View style={styles.outlinedSection}>
          <Text style={styles.title} hyphenationCallback={hyphenationCallback}>
            {data.personalData.fields.fullName}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>
            <Text style={styles.bold}> Email: </Text>
            {data.personalData.fields.email}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Telephone: </Text>
            {data.personalData.fields.telephone}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Location: </Text>
            {data.personalData.fields.city} ({data.personalData.fields.country})
          </Text>
          {data.personalData.fields.web && (
            <Text style={styles.text}>
              <Text style={styles.bold}>Web: </Text>
              <Link src={data.personalData.fields.web}>
                {data.personalData.fields.web}
              </Link>
            </Text>
          )}
        </View>

        {/* Summary Section */}
        {data.additionalData?.summary && (
          <View style={styles.section}>
            <Text style={styles.text}>{data.additionalData?.summary}</Text>
          </View>
        )}

        {/* Skills Section */}
        {data.additionalData?.skills?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>Skills</Text>
            {data.additionalData?.skills.map((skill: string, index: number) => (
              <Text key={index} style={styles.listItem}>
                • {skill}
              </Text>
            ))}
          </View>
        )}

        {/* Experience Section */}
        {data.experience.items.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>Experience</Text>
            {data.experience.items.map(
              (
                exp: {
                  startDate: string;
                  finishDate: string;
                  companyName: string;
                  positionName: string;
                  summary: string;
                  currentlyWorking: boolean;
                },
                index: number
              ) => (
                <View key={index} style={styles.section}>
                  <Text style={styles.expHeader}>
                    <Text style={styles.bold}>
                      {exp.currentlyWorking
                        ? `${exp.startDate} >> (today)`
                        : `${exp.startDate} >> ${exp.finishDate}`}
                      {` at ${exp.companyName}`}
                    </Text>
                  </Text>
                  <Text style={styles.expPosition}>{exp.positionName}</Text>
                  <Text style={styles.text}>{exp.summary}</Text>
                </View>
              )
            )}
          </View>
        )}

        {/* Education Section */}
        <View style={styles.section}>
          <Text style={styles.heading}>Education</Text>
          {data.education.items.map(
            (
              edu: { year: string; center: string; degree: string },
              index: number
            ) => (
              <View key={index} style={styles.text}>
                <Text style={styles.text}>
                  • ({edu.year}) {edu.degree} at {edu.center}
                </Text>
              </View>
            )
          )}
        </View>

        {/* Languages Section */}
        {data.additionalData?.languages?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>Languages</Text>
            {data.additionalData.languages.map(
              (
                language: { language: string; level: number },
                index: number
              ) => (
                <View key={index} style={styles.languageContainer}>
                  <Text style={styles.languageLabel}>{language.language}</Text>
                  <View style={styles.languageBarContainer}>
                    <View
                      style={[
                        styles.languageBar,
                        { width: `${(language.level / 7) * 100}%` },
                      ]}
                    />
                  </View>
                </View>
              )
            )}
          </View>
        )}
      </Page>
    </Document>
  );
};
