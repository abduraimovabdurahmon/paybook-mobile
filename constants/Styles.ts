import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 24,
    },
    selectionIcon: {
        color: "#ffffff",
        fontSize: 12,
        marginLeft: 8,
      },
    authContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    authTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        color: '#1e293b',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#f8fafc',
        color: '#0f172a',
    },
    authButton: {
        height: 50,
        borderRadius: 8,
        backgroundColor: '#3b82f6',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    authButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    authFooter: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    authFooterText: {
        color: '#64748b',
        marginRight: 5,
    },
    authFooterLink: {
        color: '#3b82f6',
        fontWeight: '600',
    },
    errorText: {
        color: '#ef4444',
        marginBottom: 15,
        textAlign: 'center',
    },
});