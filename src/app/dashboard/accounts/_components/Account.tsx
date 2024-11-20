'use client';

import { getAccountInfo, updateAccountPassword } from '@/server/actions/admin';
import { resolveHandle } from '@/server/actions/identity';
import { ComAtprotoAdminDefs } from '@atproto/api';

import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import { useEffect, useState } from 'react';

const Account = () => {
  const [handle, setHandle] = useState('');
  const [did, setDid] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [account, setAccount] = useState<
    ComAtprotoAdminDefs.AccountView | undefined
  >(undefined);
  const [error, setError] = useState('');
  const [inputError, setInputError] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const onResolveHandle = (handle: string) => {
    setDid('');
    setIsLoading(true);
    resolveHandle(handle).then(([response, error]) => {
      setIsLoading(false);
      if (!response) {
        console.error(error);
        setError(error);
        return;
      }
      setDid(response.did);
    });
  };

  const onChangePassword = (password: string) => {
    if (did && newPassword) {
      updateAccountPassword(did, password).then(([ok, error]) => {
        if (!ok) {
          console.error(error);
          if (error) {
            setInputError(error);
          }
          return;
        }
      });
    } else {
      setInputError('Password cannot be empty');
    }
  };

  useEffect(() => {
    if (handle === '') {
      setDid('');
    }
  }, [handle]);

  useEffect(() => {
    if (did) {
      getAccountInfo(did).then(([response, error]) => {
        if (!response) {
          console.error(error);
          setError(error);
          return;
        }
        setAccount(response);
      });
    }
  }, [did]);

  return (
    <div className="flex flex-col w-full gap-5 items-center">
      <div className="flex flex-row md:w-3/6 gap-5 items-center">
        <Input
          label="Handle"
          placeholder="Enter handle"
          value={handle}
          onValueChange={setHandle}
        />
        <Button color="secondary" onClick={() => onResolveHandle(handle)}>
          Resolve
        </Button>
      </div>
      {did && account ? (
        <Card className="w-3/6">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col gap-2">
              <p className="text-md">@{account.handle}</p>
              <p className="text-small text-default-500">{did}</p>
            </div>
          </CardHeader>
          <CardBody>
            {account ? (
              <div className="flex flex-col gap-3">
                <Input
                  label="Email"
                  value={account.email}
                  disabled
                  description={
                    account.emailConfirmedAt &&
                    `Confirmed: ` + account.emailConfirmedAt
                  }
                />
                {account.invitedBy?.code && (
                  <Input
                    label="Invited By Code"
                    value={account.invitedBy.code}
                    disabled
                  />
                )}
                <div className="flex flex-row gap-3 items-center">
                  <Input
                    label="Password"
                    placeholder="Enter new password"
                    type="password"
                    value={newPassword}
                    isInvalid={inputError !== ''}
                    errorMessage={inputError}
                    onValueChange={setNewPassword}
                  />
                  <Button
                    color="secondary"
                    onClick={() => onChangePassword(newPassword)}
                  >
                    Change
                  </Button>
                </div>
              </div>
            ) : (
              <p>{error}</p>
            )}
          </CardBody>
        </Card>
      ) : (
        <div>
          <p>{isLoading && 'Loading'}</p>
          <p>{error && error}</p>
        </div>
      )}
    </div>
  );
};

export default Account;
