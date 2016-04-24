
import sys
import pysftp
import zipfile

prFtpHost = 'partners.powerreviews.com' #ftp server host name
prUsername = "{yourusername}" #PR given username
prKeyPath = "{/path/to/keyfile}" #keyfile location
prPort = 22 #use 21 if ftp 

prTriggerFileName = '{triggerfile.txt}' #usually done_merchant_group_id.txt
prZipFileName = '{zipname.zip}' #usually merchant_group_id.zip
localPathWithZip = '{/path/to/zipfile/zipname.zip}' #zip file location on local server
localPath = '/path/to/zipfile/'

try:
	sftp = pysftp.Connection(prFtpHost, username=prUsername, private_key=prKeyPath, port=22) #can also use password='password' instead of private_key, but this method isn't advised. 
except pysftp.ConnectionException:
	print('Uh oh. An error was encountered. Here are the details: ' + pysftp.ConnectionException.message)
except pysftp.CredentialException:
	print('Uh oh. An error was encountered. Here are the details: ' + pysftp.CredentialException.message)
except pysftp.AuthenticationException:
	print('Uh oh. An error was encountered. Here are the details: ' + 'Authentication failed. Please check your credentials.')
except pysftp.PasswordRequiredException:
	print('Uh oh. An error was encountered. Here are the details: ' + pysftp.PasswordRequiredException.message)
except:
	print('SFTP connection could not be established. Please check the script for accuracy.')
else:
	if sftp:
		wd = sftp.pwd
		print('\nSuccessfully accessed home directory: ' + wd + '\n')

		if sftp.exists(prTriggerFileName): #check if trigger file exists
			print('Trigger file exists. Deleting trigger and getting content bundle. \n')
			sftp.remove(prTriggerFileName) #deletes trigger file
			sftp.get(prZipFileName, localpath=localPathWithZip) #get the zip file. Omit localpath if copying to cwd
		else:
			print('Trigger file does not exist, exiting. \n')

	sftp.close()
	content_bundle = zipfile.ZipFile(localPathWithZip) #path to zip file (can be path or just filename if in cwd)
	content_bundle.extractall(path=localPath) #if needing to unpack to a different directory, specify path, otherwise no parameters are needed if extracting to cwd
